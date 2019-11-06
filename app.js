var express = require('express');
var Evernote = require('evernote');
var config = require('./config');

var app = express();

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.send('Evernote');
});


app.post('/createNote',createnotes);

function createnotes(req,res){
     // console.log(req);
    var client = new Evernote.Client({
      token:'S=s1:U=956f1:E=1750bdbb70e:C=16db42a8af0:P=1cd:A=en-devtoken:V=2:H=9fddfcf32fbb88b4318950222ecaccbd',
      sandbox: config.SANDBOX,
      china: config.CHINA
    });
    var noteStore = client.getNoteStore();
    var noteTitle = req.query.noteTitle;
    var noteBody = req.query.noteContent;
    // var noteTitle = "noteTitle";  
    //var noteBody = "1st Note";
    client.getNoteStore().listNotebooks().then(function(notebooks) {
 
      var callback = function(note) {
           console.log(note);
           res.status(201).send({data: note});
      };
      for (var i in notebooks) {
        console.log(notebooks[i].guid);
         // makeNote(noteStore,noteTitle,noteBody,notebooks[i].guid,callback).catch(function(err){
         //    console.log('Error:',err);
         //     });
      }
      makeNote(noteStore,noteTitle,noteBody,'ff2e74f9-febf-416b-97cb-413f3e6ded77',callback).catch(function(err){
            console.log('Error:',err);
             });
      
      
      }).catch(function(error) {
           console.log(error);
      });
}; 


 async function makeNote(noteStore, noteTitle, noteBody, parentNotebookId, callback) {
  console.lo
  var nBody = '<?xml version="1.0" encoding="UTF-8"?>';
  nBody += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
  nBody += "<en-note>" + noteBody + "</en-note>";
   
  var ourNote = new Evernote.Types.Note();
  ourNote.title = noteTitle;
  ourNote.content = nBody;
 
  noteStore.createNote(ourNote).then(function(note) {
       console.log(ourNote);
       callback(ourNote);
   }).catch(function (err) {
   
      console.log(err);
    }); 
};

app.get('/notes',notes);

function notes(req,res) {

	var developerToken= "S=s1:U=956f1:E=1750bdbb70e:C=16db42a8af0:P=1cd:A=en-devtoken:V=2:H=9fddfcf32fbb88b4318950222ecaccbd";
	var client = new Evernote.Client({
       token: developerToken,
	     sandbox: config.SANDBOX,
	     china: config.CHINA
});

var noteStore = client.getNoteStore();

    client.getNoteStore().listNotebooks().then(function(notebooks) {
     
      for (var i in notebooks) {
      filter = new Evernote.NoteStore.NoteFilter();
      filter.notebookGuid = notebooks[i].guid;
      var resultSpec = new Evernote.NoteStore.NotesMetadataResultSpec();
      resultSpec.includeTitle= true;
      resultSpec.includeContentLength= true;
      resultSpec.resultSpecincludeCreated= true;
      resultSpec.includeUpdated= true;
      resultSpec.includeDeleted= true;
      resultSpec.includeUpdateSequenceNum= true;
      resultSpec.includeNotebookGuid= true;
      resultSpec.includeTagGuids= true;
      resultSpec.includeAttributes= true;
      resultSpec.includeLargestResourceMime= true;
      resultSpec.includeLargestResourceSize= true;
      noteStore.findNotesMetadata(filter, 0, 1000, resultSpec).then(function(notesMeta) {

         res.send("Found "+JSON.stringify(notesMeta.notes)+" notes in your default notebook . . .")
          for (var i in notesMeta.notes) {
                  res.send(i+": "+notesMeta.notes[i].title);
           }
         }).catch(function(error){
             res.send(error);
        }); 
      }	

  });

};


app.listen(port, function() {
   console.log('App listening on port ' + port)
})
