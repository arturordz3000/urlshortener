use actix_web::{get, post, http, web, App, HttpResponse, HttpServer, Responder, error, http::{header::ContentType, StatusCode}};
use actix_cors::Cors;
use actix_web::web::Json;
use serde::{Deserialize, Serialize};
use sha256::digest;
use substring::Substring;
use derive_more::{Display, Error};
use redis::{Client, Commands};
use redis::RedisResult;

pub const APPLICATION_JSON: &str = "application/json";
pub const SHORT_URL_BASE: &str = "http://localhost:3000/redirect";

#[derive(Serialize, Deserialize)]
pub struct Url {
    pub url: String,
    pub url_hash: String,
    pub short_url: String,
}

#[derive(Hash, Serialize, Deserialize)]
pub struct UrlRequest {
    pub url: String,
}

impl UrlRequest {
    pub fn to_url(&self) -> Url {
        let hash = &digest(self.url.as_str());
        let shorter_hash = hash.substring(0, 10);
        
        Url {
            url: self.url.trim().to_string(),
            url_hash: shorter_hash.to_string(),
            short_url: [SHORT_URL_BASE, shorter_hash].join("/")
        }
    }
}

#[derive(Debug, Display, Error)]
enum UserError {
    #[display(fmt = "Validation error on field: {}", field)]
    ValidationError { field: String },
    #[display(fmt = "An error occured during operation: {}", operation)]
    InternalServerError { operation: String},
    #[display(fmt = "Key does not exist: {}", key)]
    KeyNotFound { key: String},
}

impl error::ResponseError for UserError {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code())
            .insert_header(ContentType::json())
            .body(self.to_string())
    }
    fn status_code(&self) -> StatusCode {
        match *self {
            UserError::ValidationError { .. } => StatusCode::BAD_REQUEST,
            UserError::InternalServerError { .. } => StatusCode::INTERNAL_SERVER_ERROR,
            UserError::KeyNotFound { .. } => StatusCode::NOT_FOUND,
        }
    }
}

fn get_url(url_hash: &String) -> RedisResult<String> {
    let client = Client::open("redis://127.0.0.1").unwrap();
    let mut connection = client.get_connection().unwrap();

    connection.get(url_hash)
}

fn save_url(url: &Url) -> RedisResult<bool> {
    let client = Client::open("redis://127.0.0.1").unwrap();
    let mut connection = client.get_connection().unwrap();

    let url_json = serde_json::to_string(&url).unwrap();

    connection.set(url.url_hash.as_str(), url_json)
}

#[get("/{url_hash}")]
async fn get(path: web::Path<String>) -> impl Responder {
    let url_hash = &path.into_inner();

    match get_url(url_hash) {
        Ok(result) => {
            let url: Url = serde_json::from_str(&result).unwrap();

            let response = HttpResponse::Ok()
            .content_type(APPLICATION_JSON)
            .json(url);
    
            Ok(response)
        },
        Err(_error) => {
            Err(UserError::KeyNotFound { key: url_hash.to_string() })
        }
    }
}

#[post("/")]
async fn create(url_request: Json<UrlRequest>) -> impl Responder {
    if url_request.url.is_empty() {
        return Err(UserError::ValidationError { field: "url".to_string() });
    }

    let url = &url_request.to_url();

    match save_url(url) {
        Ok(_result) => {
            let response = HttpResponse::Created()
            .content_type(APPLICATION_JSON)
            .json(url);
    
            Ok(response)
        },
        Err(error) => {
            Err(UserError::InternalServerError { operation: error.detail().unwrap().to_string() } )
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    HttpServer::new(|| {
        // Remove cors when Nginx reverse proxy is ready
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            .wrap(cors)
            .service(get)
            .service(create)
    })
    .bind(("127.0.0.1", 3001))?
    .run()
    .await
}
