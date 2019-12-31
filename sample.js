const { stdin, stdout } = process;

stdin.on('data', userData => {
  stdout.write(userData);
});
