use actix_web::{get, post, App, HttpResponse, HttpServer, Responder};
use actix_web::web::Json;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sha256::digest;
use substring::Substring;

pub const APPLICATION_JSON: &str = "application/json";
pub const SHORT_URL_BASE: &str = "http://localhost/url/";

#[derive(Serialize)]
pub struct Url {
    pub url: String,
    pub short_url: String,
    pub created_at: DateTime<Utc>,
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
            url: self.url.clone(),
            created_at: Utc::now(),
            short_url: [SHORT_URL_BASE, shorter_hash].join("")
        }
    }
}

#[get("/")]
async fn home() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/")]
async fn create(url_request: Json<UrlRequest>) -> impl Responder {
    HttpResponse::Created()
        .content_type(APPLICATION_JSON)
        .json(url_request.to_url())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(home)
            .service(create)
    })
    .bind(("127.0.0.1", 3001))?
    .run()
    .await
}
