import React, {Component} from 'react'; 
import Input from '../components/Input';   
import Select from '../components/Select';
import Button from '../components/Button';
const kare_enc = new (require('kare_encryption'));
const serverPubKey = "-----BEGIN PUBLIC KEY-----\nMIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBGIdM1Sg1AEV7fR2auPild\nd+YQKkhzm0AbFPesm/ZaB7cSnfCbb9KhxSH63JVsJvK9mAT4r8ctmbKHTLkwLx6m\nw652g1Px7qDHAvQghkoXlsRjE2CvuiIx1hAdp9QezkFaNB5yutHhOs6PJGVOnG/0\nzaQJ3516vtFV6PyJe/KWTvVs5FeqaJMWi4UjOgm71q7V6/rY+cP64xplF4lZPN6v\n2RtsM/wxz2pr+rLvIMbNoX2y8RWRYRM3NWlE9dCrfh4aul6tGPdATXutgaYXHDRT\nGL7FxPrPI63RgsNSqxyXVq1J8ccStnuB9QQ/7YbIArMf+z6FLEm32kIokn1yBQ5R\nAgMBAAE=\n-----END PUBLIC KEY-----";
const serverPvtKey = "-----BEGIN RSA PRIVATE KEY-----\nMIIEoQIBAAKCAQBGIdM1Sg1AEV7fR2auPildd+YQKkhzm0AbFPesm/ZaB7cSnfCb\nb9KhxSH63JVsJvK9mAT4r8ctmbKHTLkwLx6mw652g1Px7qDHAvQghkoXlsRjE2Cv\nuiIx1hAdp9QezkFaNB5yutHhOs6PJGVOnG/0zaQJ3516vtFV6PyJe/KWTvVs5Feq\naJMWi4UjOgm71q7V6/rY+cP64xplF4lZPN6v2RtsM/wxz2pr+rLvIMbNoX2y8RWR\nYRM3NWlE9dCrfh4aul6tGPdATXutgaYXHDRTGL7FxPrPI63RgsNSqxyXVq1J8ccS\ntnuB9QQ/7YbIArMf+z6FLEm32kIokn1yBQ5RAgMBAAECggEAPwKxAtXvpbp1pOI/\n7RlIjQPmnmt/AO9h33MtO9Y8tpLr9zwUK3OCqXm2l++MCMnNmm51OQKlT+Eht9JF\nKHeNcIOrwisoRtwBdAzBTl+ZPixlcia83eW8R05u2FYrjSn/KY5eNPKJE3WElLM8\nmi6PoEEKuxxAH0JGTouwKc5FHKoPlTiaSAOE+F6qkaKjm09uYoXt0pVZg/g9JDQU\nAJqJsHa9tqwzbv/vU7g7m8H5y6hCxTK38JQc+541Tj5ka5wmCYL3YuuqqrM3WnzS\nV5XaFYgKex/Gldu+lH/4wayztPqxEog12Arq4OclUix8Erm0Ry6S35Z9uJNzvd7R\n71JO4QKBgQCJys0NK7/0/K7bGJfX/s4n9OlSi6bG2XL+MTZ9gt/UCjOhHjbgNTqv\ngLMZKOgKwRKxbsQRi7FEK4UE2wwX5CYZWitmQ5Cl9RcX7Fw9PBDxLz75BfQXXERI\nB23etTQxUwl9mqeQwtCc2sBCAd1IwVdV6NzlD9A2vXfGzNYSfoA4XQKBgQCCS+Au\nlrPCwJ+Dr1yifcddfT9Hqxb9itFqQkpqae4UMLElahesVUJL98JqtNUst2UuGaG2\nDdNL4tVD5lqBofo27z+IzJOkBRODKdQqTuQyCfkGBTHygrtGc0PIGIp8ewu1wwXU\nilhFQlcABqGi4w3elLqjuYrvuPJw2T4KUbJ+hQKBgG2quwiAiYaylXhLWo7OfcXP\nZuQLwfEBoEQvZu79+qcId48EPSi1NL/57pFXvVbR087kGajdRXi8KmJy9G0PaENF\nQMVjgPyU1Ix10fPqmpFayQPpeRwekznAr/FQxvl63VLahALzCpXMhLgEQ9pkBt6Z\nNzYYH99xbKMM5FRT2jkBAoGAAo+LMF812TX/7I6du3PNX0D+5WGvafw4cWYsIDtE\nupDaamnTXUevrd6Iq6AyMFbKXkWSsAlFhdBHcLYuQS31xO6eyQl8PVT8NS+1Q7+Z\nLIKVqlCf0qxPEetiAaS51Ah3CnNyweKWKYZMP2vh8VmVBDLYGC+lU2DHIwCh/4Hr\niCECgYAcDUeDWZeoAROW9TpHSx80EXE5Olfmd9kolBOLIukEeYdV89EyW7uOfrlf\n0iMvMD7wDpxH8BK83nHU5l4/PAm+znoo2PWd7Hvr+90f4ST0yDfaVjSkjY7+cfhr\nsCW6jKCgS5h2VI0QPn4zwWaGACRhkT1RfRXJXsaDgUknz+2XZA==\n-----END RSA PRIVATE KEY-----";

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: '',
        age: '',
        gender: '',
        role: '',
        ssn: ''

      },

      genderOptions: ['Male', 'Female', 'Other'],
      roleOptions: ['Physician', 'Therapist', 'Nurse']

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ newUser : 
        {...prevState.newUser, [name]: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser, about: value
      }
      }), ()=>console.log(this.state.newUser))
  }


  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    console.log(JSON.stringify(userData));
    let encrytedUserData = kare_enc.publicKeyEncrypt(JSON.stringify(userData), serverPubKey);
    console.log(encrytedUserData);
    let decryptedUserData = kare_enc.privateKeyDecrypt(encrytedUserData, serverPvtKey);
    console.log(decryptedUserData);

    fetch('http://dev.kure-api.com/encryption_test',{
        method: "POST",
        body: JSON.stringify({ "data" : encrytedUserData}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
          console.log('recieved');
          console.log(response)
          response.json().then(data =>{
            console.log("Successful\n" + data['recieved_data']);
            let dec = kare_enc.privateKeyDecrypt(data['recieved_data'], serverPvtKey);
            console.log(dec);
          })
    })
  }   

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({ 
        newUser: {
          name: '',
          age: '',
          gender: '',
          role: '',
          ssn: ''
        },
      })
  }

  render() {
    return (
    
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
       
          <Input inputType={'text'}
                  title= {'Full Name'} 
                  name= {'name'}
                  value={this.state.newUser.name} 
                  placeholder = {'Enter your name'}
                  handleChange = {this.handleInput}                   
                  /> {/* Name of the user */}
        
          <Input inputType={'number'} 
                name={'age'}
                 title= {'Age'} 
                 value={this.state.newUser.age} 
                placeholder = {'Enter your age'}
                 handleChange={this.handleInput} 
                 /> {/* Age */}

          <Select title={'Gender'}
                  name={'gender'}
                  options = {this.state.genderOptions} 
                  value = {this.state.newUser.gender}
                  placeholder = {'Select Gender'}
                  handleChange = {this.handleInput}
                  /> {/* Age Selection */}

          <Select title={'Role'}
                  name={'role'}
                  options = {this.state.roleOptions} 
                  value = {this.state.newUser.role}
                  placeholder = {'Select Role'}
                  handleChange = {this.handleInput}
                  /> {/* Role Selection */}

          <Input inputType={'text'}
                  title= {'SSN Number'} 
                  name= {'ssn'}
                  value={this.state.newUser.ssn} 
                  placeholder = {'Enter Social Security Number'}
                  handleChange = {this.handleInput}                   
                  /> {/* SSN of the user */}

          <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Submit'} 
              style={buttonStyle}
            /> { /*Submit */ }
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}   

        </form>  
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;
