const config = {};

config.all = {
  port: process.env.PORT || 3003,
  mongoUrl: process.env.MONGO_URL,
  googleAccessApi: {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8zQcuJo0/CNWl\n+YLltHXOEd5YN+VwRtDqsAjXAV71kAPLsXrBifL9vsyeBvmBzoL5Nwc0/nLSsApv\n7KvvmBBiRJ2a4gnLsp36obEswx1k/dY7MZKKEHNFjLRTWT5xksm/JD+DgCbmfw9R\n1TVIZizFTOI52sE8utZlk17Ax3VWSoENqp1FH3k08Ie0RL4iA7DJj9F9IOfVe9Cr\ngA3O3fdIltZ5jwt+KNxBX/00yme1ZpLYP00L5gN4hoylB/Ltjy0Ypz147ti1pz4A\niUDeELaVK1a8HOYPcSQTWQHEYsA5Qzo58hG50rPZmed//n67r/ZPK+MEDs68EjWf\nvLhx5UA9AgMBAAECggEAGqM4zJ+e1RJrhl/WQo98AYeO3daBFh6/siUFEkS8v5vC\nlVYkkjLi6D8nwnIMeO6Ilx3W8/ikfapdxp3XQlYrlZnFvMkAhc9dL7Ppef3LY2jW\n9YIQgU9B3EG2XX4da8vAkCnOlkCZ/HJX2H1i56SW0319+5isI+PehPVObJeXrAVX\nzDjXvq2RZJbJtOFWspNs8v5d1Wut08+J3ka47CmUWCGWxoo9w99z5G+mJmv5dsGS\nNOX++o9PN2J5BoS/Ds1po64Aozptix1vowOIsUxyBjb0ULj8OmI6CxwjmaLcIBN5\nYt95JeC8trqQptyG8gipXG3VA4stdbX2FcrkqKh3wQKBgQDssc1dq/XYO4rt7R1U\nplGVzNL0VVbALGUKXQE0XMd1PYJy4TMmsdB7cT1p2vm3Y4rybFwVDusw7n+t043l\neebB75NZJmUfMnUa+nYPVT5OwrXiZIX6UgSZOoRlOIik+nd+00lTqYWPOOsJ7+tg\ne6ZZBxS+lFAAV1WgEF9Ek5JroQKBgQDMMzQIFkSGIM2YdUxwq4w+cQ1oXgbH3eBW\ntXi9NX8pVL2RXuHNnytTUbD2jGFoTTu9epje9jrvlyUUFi+veES47aU8QtaPX3s1\nGqsy1yDb8n4Fwj36/6aIdOf43zrcvt6EpFyTxvbCfrtsqSO4qwACnEPJr0spPB+N\n1BxAyTyvHQKBgQDAFmO1+1Ie0+Ohx2agRgG78mfZBlDK0LyHNoc9uXXdfbeaB4z9\ngBzTsUjH2YADBnPC3ZG1PVA9e7B+n0tuygktpoIMPY6fTNGgvVaGhwVz4ay+OBpK\n1bkJqWW8x66NRP8pG8tMbC0J2IVWoTCCMpcDdS2upKpwPHAu4FqQSrrvQQKBgE5H\nNqP+/Ue5nXbbSHFModdx+STQHqNRn+U9bcqCjnumm4D1sXPkl3Q6Na9dwx17tfH9\n5Epcc91SwIkBtEf8v8Nwfk4qhRuzC4Ug8w3rQBJw0/SbMK1egVWAE0jpMiRbGuwY\nIdEYjZGjiW+vKx1ol/loM+hFxXdKMAJrlGUVf6jVAoGATiScm4vrau3+0haOFEBx\nlP3k2EjDyI7a4n5WM7CWMWQ042iisi4sqM0R65s3nRreDVTB9C/HZXSgDZLzaU8J\n+0gC6+mgaf4LCp69olaYSYYF2NVRCGXQbrh33oHJlk2Vc7AdBW6T31h0WpEnhG2M\nrrlBM8BCYr/Oh1De1bKbYbw=\n-----END PRIVATE KEY-----\n',
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    client_secret: process.env.CLIENT_SECRET,
  },
};

module.exports = config;
