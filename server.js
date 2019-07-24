const express = require ( 'express' );
const app = express ();
const childProcess = require ( 'child_process' );
const util = require ( 'util' );
const uuid = require ( 'uuid' );
const fs = require ( 'fs-extra' );
const del = require ('del');

// Async route wrap to deal with error handling
const wrap = ( fn ) => {
	return ( req, res, next ) => {
		Promise.resolve ( fn ( req, res, next ) )
			.catch ( next );
	};
};

// POST to this endpoint to generate a carbonized image
app.post ( '/api/v1.0/carbonize', wrap ( async ( req, res, next ) => {
	try {

		// Create a temporary folder for the image
		let tempFolderName = uuid.v4 ();
		await fs.mkdir ( tempFolderName );

		// Call cli command using child process exec
		let output = await util.promisify ( childProcess.exec ) ( process.execPath + ` ./cli.js cli.js -l ${tempFolderName} -t image` );

		// Check if a particular string is present - if it is then the image creation was successful
		if ( output.stdout.includes ( 'The file can be found here' ) ) {

		} else {
			return next ( output.stderr || output.stdout );
		}

		// Read image into mem then delete the temp folder
		let image = await fs.readFile ( `./${tempFolderName}/image.png` );
		await del ( tempFolderName );

		res.set('Content-disposition', 'attachment; filename=image.png');
		res.set('Content-Type', 'image/png');

		return res.send ( image );

	} catch ( e ) {
		return next ( e );
	}
} ) );

app.use ( ( err, req, res, next ) => {
	res.statusCode = 500;
	return res.json ( err.error || err.message || err.toString () );
} );

app.listen ( 3003, () => {
	console.log ( 'Listening on port 3003.' );
} );
