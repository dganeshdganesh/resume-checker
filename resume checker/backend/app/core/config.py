import os


class Settings:
    def __init__(self) -> None:
        origins = os.getenv("CORS_ORIGINS", "http://localhost:5173")
        self.cors_origins = [origin.strip() for origin in origins.split(",") if origin.strip()]
        self.max_upload_bytes = 5 * 1024 * 1024


settings = Settings()
