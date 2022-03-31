# Start locally:
Frontend repo:
- git clone: https://github.com/EmmaHammar/coupon-tool
- npm start

Backend repo: 
- https://github.com/EmmaHammar/coupon-tool-backend
- npm start (dev mode: nodemon start)

# TODO: Add more info from FE repo




//Copy TinyEditor:
import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
// import Loader from './Loader';

export default function TinyEditor(props) {

  //TODO clean states!!
const editorRef = useRef(null);
const [isPicked, setIsPicked] = useState(false); //clickUpload
const [fileUploadMsg, setFileUploadMsg] = useState('');
const [showUploadBtn, setShowUploadBtn] = useState(false);
const [isToolBar, setIsToolBar] = useState(false);
const [isLoadingStep, setIsLoadingStep] = useState(true);

//prevent printing Editor before right toolbarOptions is added:
useEffect( () => {
  setIsToolBar(true)
}, [props.toolBarOptions]);

useEffect( () => {
  setTimeout( () => {
    setIsLoadingStep(false)
  }, 500);
});


//check if editor is empty or not -> inactive/active nextBtn
const onChangeEditor = () => {
  console.log("onChangeEditor");
  props.setContent(editorRef.current.getContent()); //update content state in App.js
 
  document.getElementById('errorMsg').innerHTML = ''; //empty errorMsg

  if (editorRef.current.getContent() === '') {
    props.setIsNextBtnActive(false);
  } else {
    props.setIsNextBtnActive(true);
  }
};

const onClickEditor = (evt) => {
  console.log("onClickEditor");
}

  return (
    <>
    {/* { isLoadingStep ? <Loader /> : */} 
      <div id='tinyEditorWrapper' className='my-6'>
        {isToolBar ? 
          <Editor
              apiKey="69wczpmvrwl3efu8wt4yoxrygv2rouack6dnd61okwlmizpw"
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue=""
              init={{

                force_br_newlines : true, //don't wrap in p tag
                force_p_newlines : false, //don't wrap in p tag
                forced_root_block : '', //don't wrap in p tag

                entity_encoding : "raw", //allow åäö
          
                language: 'sv_SE',
                image_dimensions: false, //remove customized widht and height
                
                
                toolbar_mode: 'sliding', //makes toolbar 2 rows when click dots btn if mobile screen
                theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
                font_size_style_values : "10px,12px,13px,14px,16px,18px,20px",

                height: 300,
                // width: 348,
                menubar: false,
                plugins: [
                  'advlist autolink lists image charmap print preview',
                  'searchreplace visualblocks code',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: `${ props.toolBarOptions }`,

                // setup: function (editor) {
                //   editor.addButton(`${ 'myBtn' }`, {
                //     text: 'Bakgrundsfärg',
                //     onClick: function () {
                //       alert('Button clicked!');
                //     }
                //   });
                // },
                

                content_style: 'body { font-family:Helvetica neue,sans-serif; font-size:14px; cursor:pointer; border: 2px solid red;}', //TODO change style 
                // content_css: '../tinyEditor.css',
                // content_style: 'body { background-color: #F00}',
              }}
              onChangeEditor={onChangeEditor}
              // onClickEditor={onClickEditor}

            />
            : ''}    
        </div>
      {/* } */}
    </>
  )
};

//TODO 
//https://www.tiny.cloud/docs-3x/customization/TinyMCE3x@Creating_a_skin/ 
//add proper tags depending img or text
//choose color picker for bg, not file upload
//handle ie replace() or similar for åäö etc in tinyMCE
//when printing tinyEditor - check if data in db exists - if true -> print saved ex logo, bg, text?
//decide if remove or comment back loader

//plugins from start
// plugins: [
//   'advlist autolink lists image charmap print preview',
//   'searchreplace visualblocks code fullscreen',
//   'insertdatetime media table paste code help wordcount'
// ],

//<img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="" width="1184" height="622" />


//TODO add custom fonts: https://www.tiny.cloud/blog/tinymce-custom-font-family/ 


//specify file type: https://www.tiny.cloud/docs/configure/file-image-upload/ 


//Add css to tinyEditor: https://www.tiny.cloud/docs-3x/reference/Configuration3x/Configuration3x@content_css/ (skin, content css")


//remove html wrapper around tinymce??

//TODO add aria labels to all buttons in whole project