const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false })); 

global.loginMessage = "Login";

app.get('/', (req, res) => {
    let loginPage = `
            <html><head><title>Login</title></head>
            <body>
                <h3>${global.loginMessage}</h3>
                <form action="/login">
                    username: <input type="text" name="username"><br>
                    password: <input type="password" name="password"><br>
                    <input type="submit" value="Login">
                </form>
			</body>
			</html>
        `;
    res.send(loginPage);
});

app.get('/login', (req, res) => {
    var username = req.query.username;
    var password = req.query.password;

    if (password != 'ppp') {
        global.loginMessage = 'Password incorrect! Try again!';
        return res.redirect('/');
    }
    global.loginMessage = "Login";
    res.send(`
	Hi ${username}!! Password: ${password}<br><br>
	Choose where you want to go:
        <form action = "/stuff" method = "POST">
        <input type="radio" id = "cs" name="cs" value="/cs">CS Home
        <input type="radio" id = "sung" name="cs" value="/cs3"> Dr. Sung Home<br>
        <input type="radio" id =  "urlb" name="cs" value="/url"> Type any URL http://
        <input type="text" name="line"><br>
        <input type="submit" name = "go" value="Go!">
        </form>`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running at port', port);
});

app.post('/stuff',function(req, res){
	  let url = req.body.line;
	  if(req.body.cs == '/cs'){
  res.redirect('http://cs.uco.edu');
	  } 
	  else if(req.body.cs == '/cs3'){
  res.redirect('http://cs3.uco.edu');
	  }
  else if(req.body.cs == '/url'){
  res.redirect('http://' + url);
	  }
});
