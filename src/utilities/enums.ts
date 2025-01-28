export enum ERole {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}
export enum ELang {
  UZ = "uz",
  RU = "ru",
  EN = "en",
  TJ = "tj",
  KZ = "kz",
}

export enum EErrorStatus {
  Unauthorized = 401,
  Forbidden = 403,
  InternalServerError = 500,
}

export enum ERules {
  VIDEO_KEY = "video_key",
  STATUS = "status",
  TYPE = "type",
  TITLE = "title",
  DESCRIPTION = "description",
  TAGS = "tags",
  NAME = "name",
  PHONE = "phone",
  PASSWORD = "password",
  CATEGORY_IDS = "category_ids",
  KEYWORDS = "keywords",
  ROLE = "role",
  AGE = "age",
  GENDER = "gender",
  POSTER = "poster_link",
  SITE = 'site',
}

export enum EApi {}

export enum ETab {
  VIDEO_UPLOAD = 1,
  VIDEO_CREATE,
  INSTAGRAM,
  TELEGRAM,
  FACEBOOK,
  YOUTUBE,
}

export enum EVideoType {
  LONG = "LONG",
  SHORT = "SHORT",
}

export enum ETypeVideo {
  REELS = "REELS",
  VIDEO = "VIDEO",
}

export enum EPropType {
  SMALL = "small",
  DEFAULT = "default",
  LARGE = "large",
}
