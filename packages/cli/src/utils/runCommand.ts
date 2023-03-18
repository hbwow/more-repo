import execa from "execa";

function runCommand(command, args) {
  return execa(command, { shell: true, ...args });

  // if (!args) {
  //   [command, ...args] = command.split(/\s+/);
  // }
  // return execa(command, args);
}

export default runCommand;
