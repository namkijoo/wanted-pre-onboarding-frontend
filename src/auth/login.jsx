import React,{useEffect, useState} from "react";
import Axios from "axios";
import styles from "./login.module.css";


export default function Login() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const[emailValid,setEmailValid]  = useState(false);
    const[pwValid,setPwValid]  = useState(false);
    

    const handleId = (e)=>{
        const idValue = e.target.value;
        setEmail(idValue);
    }

    const handlePassWord = (e)=>{
        const pwValue=e.target.value;
        setPw(pwValue);
        
    }

    useEffect(()=>{
        if(localStorage.getItem("token")!=null){
            window.location.href="/todo"
        }
    },[])

    useEffect(()=>{
        const regex = /^.{8,}$/;
        
        if(regex.test(pw)){
            setPwValid(true);
        }else{
            setPwValid(false);
        }
    },[pw])

    useEffect(()=>{
        const regex2 =/@/;;
        
        if(regex2.test(email)){
            setEmailValid(true);
        }else{
            setEmailValid(false);
        }
    },[email])
    Axios.defaults.baseURL = 'https://www.pre-onboarding-selection-task.shop'
    const onClickConfirm=()=>{
        if(email==""){
            alert("아이디를 입력해주세요")
            return;
        }
        if(pw==""){
            alert("비밀번호를 입력해주세요")
            return;
        }

        
        Axios.post('/auth/signin', {
            email: email,
            password: pw
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"  
            }
        })
        .then(function(response){
            console.log(response);
            if(response.status=="200"){
                alert("로그인에 성공했습니다.")
                localStorage.setItem("token",response.data.access_token)
                window.location.href="/todo"
            }
        })
        .catch(function(error){
            alert("로그인에 실패하셨습니다.")
        })
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            onClickConfirm();
        }
      }

    return (
        <div id={styles.page}>
            <h1 id={styles.title}>로그인</h1>
            <div id={styles.inputWrapper}>
                
                <input id={styles.email} placeholder="이메일을 입력해주세요" value={email} onChange={handleId} type='text' data-testid="email-input"/>
                <div className={styles.errorMessageWrap}>
                {!emailValid&&email.length>0&&(
                        <div>이메일 형식으로 입력해주세요.</div>
                    )}
                </div>
                <input id={styles.email} placeholder="비밀번호를 입력해주세요." value={pw} onChange={handlePassWord} type='password' onKeyDown={handleKeyPress} data-testid="password-input"></input>
                
                <div className={styles.errorMessageWrap}>
                    {!pwValid&&pw.length>0&&(
                        <div>영문, 숫자, 특수문자 포함 8장 이상 입력해주세요.</div>
                    )}
                </div>
            </div>
            
            <div id={styles.button}>
                <button id={styles.pass} onClick={onClickConfirm} data-testid="signin-button" disabled={!pwValid||!emailValid}>
                    로그인 하기
                </button>
            </div>

            <div id={styles.search}>
                <span id={styles.register}><a href="/signup" >회원가입</a></span>
            </div>
        </div>

    )
}