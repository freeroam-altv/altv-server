import * as dotenv from "dotenv";
import vault from "node-vault";

let provider: vault.client;

const newConfiguration = async (path: string): Promise<string> => {
  let err = init(path);
  if (err !== null) {
    return err;
  }

  await initVault();

  return null;
};

const getConfigValue = async (key: string): Promise<string> => {
  if (key === "") {
    return "";
  }

  const secret = process.env[`${key}_SECRET`].trim();
  if (secret === "") {
    return process.env[key];
  }

  const splitSecret = secret.split(":");
  const { data } = await provider.read(`kv/data${splitSecret[0]}`);

  return data.data[splitSecret[1]];
};

const initVault = async (): Promise<void> => {
  provider = vault({
    apiVersion: "v1",
    endpoint: process.env.VAULT_ADDRESS
  });

  const result = await provider.approleLogin({
    role_id: process.env.VAULT_CONFIG_ROLE_ID,
    secret_id: process.env.VAULT_CONFIG_SECRET
  });

  provider.token = result.auth.client_token;
};

const init = (path: string): string => {
  try {
    dotenv.config({ path: path });
    return null;
  } catch (e) {
    return e.toString();
  }
};

export { newConfiguration, getConfigValue };