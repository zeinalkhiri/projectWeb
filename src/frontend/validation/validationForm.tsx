export default function validationForm(
  username: any,
  password: any,
  passwordConfirm: any
) {
  const specialChars = [
    '+',
    '-',
    '=',
    '(',
    ')',
    '*',
    '&',
    '^',
    '%',
    '$',
    '#',
    '@',
    '!',
  ];
  const forbiddenWords = ['select', 'create', 'delete', 'update', 'alter'];
  const passwordChar = password.toString();
  let usernameError;
  let passwordError;
  let passwordConfirmError;
  if (username.length < 4) {
    usernameError = 'username should be more then 4 ';
  }

  if (passwordChar.length < 6) {
    passwordError = 'password should be more then 6 char';
  }

  if ([...passwordChar].some((char) => specialChars.includes(char))) {
    passwordError = 'should not contain on of these letter !@#$%^&*()-=+';
  }
  if (
    passwordChar.split(' ').some((word:any) => forbiddenWords.includes(word)) ||
    username.split(' ').some((word:any) => forbiddenWords.includes(word))
  ) {
    passwordError = "you can't engage to our database";
  }
  if (password !== passwordConfirm) {
    passwordConfirmError = 'passwords should be match';
  }

  return { usernameError, passwordError, passwordConfirmError };
}
