#!/bin/bash
# vault login -address=http://localhost:8200
# START THIS SCRIPT:  VAULT_ADDR=http://localhost:8200 sh vault-init.sh

vault auth enable approle

vault policy write config -<<EOF
path "kv/data/config" {
  capabilities = [ "read", "list" ]
}
path "verification_codes/data/*" {
  capabilities = [ "create", "read", "update", "list", "delete" ]
}
path "auth/token/renew-self" {
  capabilities = ["update"]
}
EOF


vault write auth/approle/role/config token_policies="config" \
    token_ttl=100h token_max_ttl=104h

vault read auth/approle/role/config/role-id
vault write -force auth/approle/role/config/secret-id