const UserQueries = require( "../db/queries/UserQueries.js" );
const queries = new UserQueries();
const auth = require( "../util/authentication.js" );

module.exports = {

  signUp( req, res, next ) { res.render( "users/sign-up" ); },

  create( req, res, next ) {

    const values = {
      username: req.body.username,
      email: req.body.email,
      password: auth.encrypt( req.body.password )
    };

    queries.insert( values, ( err, user ) => {
      if ( err ) {
        req.flash( "style", "danger" );
        req.flash( "alert", err );
        res.redirect( ( req.headers.referer || "/users/sign-up" ) );
      }
      else { auth.signIn( req, res, next ); }
    } );
  },

};