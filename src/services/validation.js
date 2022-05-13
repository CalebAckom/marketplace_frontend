import { isEmail } from "validator";

export const required = (value) => {
  if (!value) {
    return (
      <div className="textRed">
        This field is required!
      </div>
    );
  }
};

export const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="textRed">
        This is not a valid email.
      </div>
    );
  }
};

export function emailVerification(value) {
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  return pattern.test(value);
}


