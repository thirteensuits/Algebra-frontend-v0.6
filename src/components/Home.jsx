import React, {useState, useEffect} from "react";
import axios from 'axios';
import GIF from "./images/Algebra_logo.gif";
import chain from './images/chained3.gif';
import think from './images/thinking.jpg';
import { NavHashLink as Link } from 'react-router-hash-link';


function Home() {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [twitter, setTwitter] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    setSubmitting(true);

    const data = {
      Twitter: twitter,
      Email: email,
      Message: message
    }
    axios.post('https://sheet.best/api/sheets/468a4a9d-3252-4b47-b94e-72d03d326ee7',data).then((response)=>{
      setTwitter('');
      setEmail('');
      setMessage('');
    })
  }

  const getData=()=>{
    axios.get('https://sheet.best/api/sheets/468a4a9d-3252-4b47-b94e-72d03d326ee7').then((response)=>{
      setData(response.data);
    })
  }

  useEffect(() =>{
    getData();
  },[data])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },2000)
  },[])


  return (
  <div className="home">
    {
      loading ? (
        <div style={{textAlign: "center"}}>
      <img src={GIF} loading={loading} class="opener" />
      </div>

      ) : (
      <>
      <div class="borders">
        <h2 class="top" style={{textAlign: "center"}}><b>reimagine commerce</b></h2>
        <h5 style={{textAlign: "center"}}><i>providing on-chain representation for everyday products</i></h5>
        <section id ="hook">
          <div class="secondary">
            <h1 class="invite">are you interested in exploring what web3 commerce will look like?</h1>
            <p class>we are looking for influencers and product creators to bring web3 commerce to life.</p>
            <Link to='/#contact'><button className="loginBtn" style={{paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>Contact Us</button></Link>
            </div>
            <div class="thick">
            <img src={chain} style={{width: "80%"}}/>
            </div>
        </section>
        <section id ="thesis">
          <div class="thick2">
          <img src={think} style={{width: "80%"}}/>
          </div>
          <div class = "mid">
          <h2 class = "invite2">want to know what we're imagining?</h2>
          <p>check out our brief thesis</p>
          <button className="loginBtn" onClick={(e) => {window.open("/thesis.pdf", "_blank");}} style={{paddingLeft: 20, paddingRight: 20, marginTop: 20}}>Open PDF</button>
          </div>
        </section>
        <section id="contact" class="secondary">
        <h1 style={{textAlign: "center"}}>contact us</h1>
      <br></br>
      <form autoComplete="off" className='borders'
      onSubmit={handleSubmit}>
        <label>Twitter</label>
        <input type='text' className='form-control' required
          placeholder='Enter your Twitter' onChange={(e)=>setTwitter(e.target.value)}
          value={twitter}
        />
        <br></br>
        <label>Email</label>
        <input type='text' className='form-control' required
          placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
        <br></br>
        <label>Comments</label>
        <textarea className='form-control' rows="3"
          placeholder='Anything thoughts you want to share?'
          onChange={(e)=>setMessage(e.target.value)}
          value={message}
        />
        <br></br>
        <div style={{textAlign: "center"}}>
        <button className="loginBtn" type='submit' style={{paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>Submit</button>
        <br></br>
        <br></br>
        {submitting && <h5 class="thanks">thank you, we will be in touch!</h5>}
        </div>
      </form>
        </section>
      </div>
      </>
)
      }

    </div>
  );
}

export default Home;
