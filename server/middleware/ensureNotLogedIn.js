const ensureNotLogedIn=(req,res,next)=>{
    const token = req.cookies.token;

  if(token) {
    return res.status(401).render("messagePage", {
       message: 'you are already loged in',
     redirectUrl: "/"
     });
    
  }

  try {
    next();
  } catch(error) {
    res.status(401).json( { message: 'authorization failed'} );
  }
}
module.exports=ensureNotLogedIn;