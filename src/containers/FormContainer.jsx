import React, {Component} from 'react'; 
import Input from '../components/Input';   
import Select from '../components/Select';
import Button from '../components/Button';
const kare_enc = new (require('kare_encryption'));
const serverPubKey = "-----BEGIN PUBLIC KEY-----\nMIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBGIdM1Sg1AEV7fR2auPild\nd+YQKkhzm0AbFPesm/ZaB7cSnfCbb9KhxSH63JVsJvK9mAT4r8ctmbKHTLkwLx6m\nw652g1Px7qDHAvQghkoXlsRjE2CvuiIx1hAdp9QezkFaNB5yutHhOs6PJGVOnG/0\nzaQJ3516vtFV6PyJe/KWTvVs5FeqaJMWi4UjOgm71q7V6/rY+cP64xplF4lZPN6v\n2RtsM/wxz2pr+rLvIMbNoX2y8RWRYRM3NWlE9dCrfh4aul6tGPdATXutgaYXHDRT\nGL7FxPrPI63RgsNSqxyXVq1J8ccStnuB9QQ/7YbIArMf+z6FLEm32kIokn1yBQ5R\nAgMBAAE=\n-----END PUBLIC KEY-----";

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
    let encrytedUserData = kare_enc.publicKeyEncrypt(JSON.stringify(userData),serverPubKey);
    console.log(encrytedUserData);

    fetch('http://example.com',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
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
