# Passifist 🔒✊

Passifist is a password manager built with Deno. It uses SHA-512 for hashing and provides a terminal interface for user interaction.  
The generated passwords will not be displayed on the screen, instead they are copied to clipboard.  
This is a terminal alternative for https://password.copyninja.dev website.

## Installation

1. Ensure you have [Deno installed](https://deno.land/#installation) on your machine.
2. Clone the repository to your local machine.
3. Navigate to the project directory.

## Running the source directly

Run the `main.ts` file with Deno:

```sh
deno run --allow-run main.ts
```

This will prompt you to enter your master password, pin, and password index.

## Build

Build with Deno:

```sh
deno compile --allow-run main.ts
```

On Windows, this generates a `passifist.exe` which you can run to generate passwords.

## Contributing

Contributions are welcome. Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
```

Please replace the placeholders with the actual information about your project.
