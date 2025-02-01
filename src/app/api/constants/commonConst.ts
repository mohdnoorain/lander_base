import path from "path";

enum RES_STATUS {
    // success                  -> 200 succesffully executed.
    // created                  -> 201 resource created (e.g. insert, add).
    // bad-request              -> 400 a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    // unauthorized             -> 401 need to authenticate.
    // forbidden                -> 403 not allowed.
    // not-found                -> 404 wrong url -> the endpoint is valid but the resource itself does not exist.
    // method-not-allowed       -> 405 using get required post.
    // request-timeout          -> 408 timeout limmit reached maybe sloe internet.
    // internal-server-error    -> 500 server error (something wrong withe code).
    // bad-gateway              -> 502 an another api server was using stop responding or giving error.
    // service-unavailable      -> 503 can not process the request right now due to any reason.

    success = 200,
    created = 201,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    methodNotAllowed = 405,
    requestTimeout = 408,
    internalServerError = 500,
    badGateway = 502,
    serviceUnavailable = 503,
}

const DB_PATHS = {
    Auth: path.join(process.cwd(), ".next/db/auth.json"),
    Header: path.join(process.cwd(), ".next/db/header.json"),
    MainSection: path.join(process.cwd(), ".next/db/mainSection.json"),
    Feature: path.join(process.cwd(), ".next/db/feature.json"),
    GallerySection: path.join(process.cwd(), ".next/db/gallerysection.json"),
    AmenitiesData: path.join(process.cwd(), ".next/db/amenities.json"),
    Nearbysection: path.join(process.cwd(), ".next/db/nearbysection.json"),
    PaymentSection: path.join(process.cwd(), ".next/db/paymentsection.json"),
    EnquirePropertSection: path.join(process.cwd(), ".next/db/enquirysection.json"),
    similiarprojectsection: path.join(process.cwd(), ".next/db/similiarsection.json")
}
const DB_PATHS_FALLBACK = {
    Auth: path.join(process.cwd(), "src/db/auth.json"),
    Header: path.join(process.cwd(), "src/db/header.json"),
    MainSection: path.join(process.cwd(), "src/db/mainSection.json"),
    Feature: path.join(process.cwd(), "src/db/feature.json"),
    GallerySection: path.join(process.cwd(), "src/db/gallerysection.json"),
    AmenitiesData: path.join(process.cwd(), "src/db/amenities.json"),
    Nearbysection: path.join(process.cwd(), "src/db/nearbysection.json"),
    PaymentSection: path.join(process.cwd(), "src/db/paymentsection.json"),
    EnquirePropertSection: path.join(process.cwd(), "src/db/enquirysection.json"),
    similiarprojectsection: path.join(process.cwd(), "src/db/similiarsection.json")
}

export { RES_STATUS, DB_PATHS, DB_PATHS_FALLBACK };