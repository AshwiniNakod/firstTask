
import bcrypt from 'bcryptjs';
let password = "Ashwini"
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync(password, salt);
// console.log(hash)
let decrypt=bcrypt.compareSync("Ashwini", "$2a$10$pfA0sVxY.zJeUEMXUlKuHufSeM1895klvendn6I7YuUSc0Tt7Q8dy"); // true
console.log(decrypt)
// Store hash in your password DB.