const serviceAccount = {
  type: "service_account",
  project_id: "zippy-mvp2",
  private_key_id: process.env.YOUR_PRIVATE_KEY_ID,
  private_key: process.env.YOUR_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  client_email: "firebase-adminsdk-czdjd@zippy-mvp2.iam.gserviceaccount.com",
  client_id: process.env.YOUR_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-czdjd%40zippy-mvp2.iam.gserviceaccount.com",
};
export {};

// Exports
module.exports = serviceAccount;
