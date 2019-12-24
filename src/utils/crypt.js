import base64 from 'base-64'
import utf8 from 'utf8'

export function encode(str) {
  return base64.encode(utf8.encode(str));
}
export function decode(str) {
  return utf8.decode(base64.decode(str));
}