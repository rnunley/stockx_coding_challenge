CREATE USER stockx_rwn_service;
ALTER USER stockx_rwn_service WITH ENCRYPTED PASSWORD 'password123';
GRANT CONNECT ON DATABASE postgres TO stockx_rwn_service;

CREATE SCHEMA stockx_rwn;

CREATE TABLE stockx_rwn.true_to_size (
  id SERIAL PRIMARY KEY,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  size DOUBLE PRECISION NOT NULL
);

GRANT USAGE ON SCHEMA stockx_rwn TO stockx_rwn_service;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA stockx_rwn TO stockx_rwn_service;
GRANT SELECT, INSERT ON TABLE stockx_rwn.true_to_size TO stockx_rwn_service;
