export const SET_HOSTNAME_START = "SET_HOSTNAME_START";
// export const SET_HOSTNAME_END = "SET_HOSTNAME_END";

export function setHostnameStart(hostname){
  return {
    type: SET_HOSTNAME_START,
    payload: hostname,
  }
}