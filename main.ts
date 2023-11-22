// Draw a terminal menu using deno
import { Select, Secret } from "https://deno.land/x/cliffy/prompt/mod.ts";

const PASS_LENGTH = 12

const masterPass = await Secret.prompt("Enter your password");
const pin = Number(await Secret.prompt("Enter your pin"));
const passIndex = clamp(Number(await Secret.prompt("Enter the password index (0-9)")), 0, 9);
const clearTime = await Select.prompt({
  message: "How long should the password be copied to the clipboard?",
  options: [
    { name: "5 seconds", value: 5 },
    { name: "30 seconds", value: 30 },
    { name: "10 minutes", value: 600 },
    { name: "Don't clear", value: 0 },
  ]
});

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}


async function sha512(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const a = await sha512(masterPass)

const b = (() => {
  if (!pin) return a

  const shiftBy = pin % 26

  return a.replace(/[a-z]/g, (char) => {
    const charCode = char.charCodeAt(0)
      
    return String.fromCharCode(
      ((charCode + shiftBy) <= 122)
        ? charCode + shiftBy
        : (charCode + shiftBy) % 122 + 96
    )
  })
})()

const c = (
  [...b]
  .map((char, i) => (
    (i % 2)
      ? char.toUpperCase()
      : char
  ))
  .join('')
 )

const d = c.match(new RegExp('.{1,' + PASS_LENGTH + '}', 'g'))!

async function copyToClipboard(text: string) {
  const p = Deno.run({
    cmd: ['clip'],
    //cmd: ['powershell', '-noprofile', '-command', '$input|Set-Clipboard'],
    stdin: "piped",
  });

  await p.stdin.write(new TextEncoder().encode(text));
  p.stdin.close();
  await p.status();
  p.close();
}

await copyToClipboard(d[passIndex])
if (clearTime) {
  await new Promise(resolve => setTimeout(resolve, clearTime * 1000))
  await copyToClipboard('')
}
