import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    NavLink
  } from 'react-router-dom';

export default class Create extends Component {
    handleUpload = () => {
        let options = {
          cloud_name: 'ghibli-cloud', 
          upload_preset: 'ghibli-preset',
          multiple: false,
          // cropping: true,
          resource_type: 'image'
        };
    
        window.cloudinary.openUploadWidget(options, (error, result) => { 
            console.log(result)
          if (error) {
            console.error(error);
            return;
          }
          
          const image = result[0];
          this.setState({ img: image.url }); // or you can store publicId for easier transformations
        });
    
      }
    render() {

          console.log(this.state)
        return (
            
            <div>
                <Router>
                     <header>
                        <NavLink exact activeClassName = 'active-link' to ='/'>Home</NavLink>
                        <NavLink exact activeClassName = 'active-link' to = '/catalog'>Catalog</NavLink>        
                        <NavLink exact activeClassName = 'active-link' to = '/Edit'>Edit</NavLink>                    
            </header>
            <label>
                img 
                {/* needs handler */}
                <button type="button">Upload Image</button>
            </label>
            </Router>
            </div>
            )
        }
    }
    