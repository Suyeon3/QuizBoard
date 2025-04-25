import { useRef, useState, useEffect } from "react";
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import JoinInput from "../component/JoinInput";


const MSG = {
    noWarn: 'noWarn',
    required: '*필수입력 항목입니다.',
    emailDupli: '*중복된 이메일입니다.',
    usernameDupli: '*중복된 닉네임입니다.',
    emailPattern: '*잘못된 이메일 형식입니다.',
    pwdPattern: '*비밀번호는 8자리 이상, 숫자와 영문자를 포함해야 합니다.',
    usernamePattern: '*닉네임은 25자리 이하여야 합니다.',
    passwordConfirm: '*비밀번호가 일치하지 않습니다.',
};

const EMAIL_REG = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const PWD_REG = /(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

export default function Join() {
    const [formData, updateFormData] = useImmer({
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
    });

    const [warnMsg, updateWarnMsg] = useImmer({
        email: '',
        password: '',
        passwordConfirm: '',
        username: ''
    });

    const [disabled, setDisabled] = useState(true);

    const focusRef = useRef(null);
    const navigate = useNavigate();

    const handleValue = (e) => {
        focusRef.current = e.target;
        const name = e.target.name;
        const value = e.target.value;
        updateFormData(draft => {
            draft[name] = value.trim();
        })
    }

    useEffect(() => {
        // console.log(formData);
        validate();
    }, [formData]);

    useEffect(() => {
        if (Object.values(warnMsg).every(value => value === MSG.noWarn)) {
            setDisabled(false);
        };
    }, [warnMsg]);

    // 유효성 검사
    const validate = (e) => {
        let target;
        let value;
        if (focusRef.current) {
            target = focusRef.current.name;
            value = formData[target];
        } else {    
            return;
        }

        if (!checkRequired(target)) return;

        if (target === 'passwordConfirm') {
            if (!confirmPwd(target)) return;
        } else {
            if (!checkPattern(target)) return;
            if (target === 'email' || target === 'username') {
                if (!checkDupli(target)) return;
            }
        }
        handleWarnMsg(target, 'noWarn');
    }

    // 필수 입력 확인
    const checkRequired = async (name) => {
        if (formData[name] === '') {
            handleWarnMsg(name, 'required');
            return false;
        } else {
            return true;
        }
    }


    // 패턴확인
    const checkPattern = (name) => {
        let result;
        switch (name) {
            case 'email':
                console.log('dlsjfl');
                result = EMAIL_REG.test(formData.email);
                handleWarnMsg(name, 'emailPattern');
                break;
            case 'username':
                result = formData.username.length <= 25 ? true : false;
                handleWarnMsg(name, 'usernamePattern');
                break;
            case 'password':
                result = PWD_REG.test(formData.password);
                handleWarnMsg(name, 'pwdPattern');
                break;
            default:
                result = false;
        }
        return result;
    }

    const checkDupli = async (name) => {
        try {
            let url;
            let body = {};
            if (name === 'email') {
                body.email = formData.email;
                url = 'email'
            } else if (name === 'username') {
                body.username = formData.username;
                url = 'username';
            };

            const response = await axios.post(`/auth/join/${url}`, body);

            const message = response.data.message;

            if (message) {
                if (message === '닉네임 중복 검사 실패' || message === '이메일 중복 검사 실패') {
                    const msg = name === 'email' ? 'emailDupli' : 'usernameDupli';
                    handleWarnMsg(name, msg);
                    return false;
                } else if (message === '닉네임 중복 검사 실패' || message === '이메일 중복 검사 실패') {
                    return true;
                }
            } else {
                console.log(`no message: ${message}`);
                return false;
            }
        } catch (error) {
            console.error('Error checking duplication: ', error.message);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: formData.email,
                password: formData.password,
                username: formData.username,
            }
            const response = await axios.post('http://localhost:5001/auth/join', data);
            console.log(response.data.message)
            if (response.data.success) {
                // 서버에서 받은 URL로 이동
                navigate(response.redirectUrl);
            }

        } catch (error) {
            console.error('회원가입 오류:', error);
        }
    }

    // 비밀번호 재확인
    const confirmPwd = (name) => {
        if (formData.passwordConfirm !== formData.password) {
            handleWarnMsg(name, 'passwordConfirm');
            return false;
        } else {
            return true;
        }
    }

    // 경고메세지 업데이트
    const handleWarnMsg = (name, msg) => {
        updateWarnMsg(draft => {
            draft[name] = msg;
        })
    }

    return (
        <div>
            <JoinInput
                label={'이메일'}
                type={'text'}
                name={'email'}
                value={formData.email}
                onChange={handleValue}
                placeholder={'이메일을 입력하세요'}
            />
            {warnMsg.email === 'required' && <span>{MSG.required}</span>}
            {warnMsg.email === 'emailPattern' && <span>{MSG.emailPattern}</span>}
            {warnMsg.email === 'emailDupli' && <span>{MSG.emailDupli}</span>}
            <JoinInput
                label={'비밀번호'}
                type={'password'}
                name={'password'}
                value={formData.password}
                onChange={handleValue}
                placeholder={'비밀번호를 입력하세요'}
            />
            {warnMsg.password === 'required' && <span>{MSG.required}</span>}
            {warnMsg.password === 'pwdPattern' && <span>{MSG.pwdPattern}</span>}
            <JoinInput
                label={'비밀번호 재확인'}
                type={'passwordConfirm'}
                name={'passwordConfirm'}
                value={formData.passwordConfirm}
                onChange={handleValue}
                placeholder={'비밀번호를 다시 입력하세요'}
            />
            {warnMsg.passwordConfirm === 'required' && <span>{MSG.required}</span>}
            {warnMsg.passwordConfirm === 'passwordConfirm' && <span>{MSG.passwordConfirm}</span>}
            <JoinInput
                label={'닉네임'}
                type={'username'}
                name={'username'}
                value={formData.username}
                onChange={handleValue}
                placeholder={'닉네임을 입력하세요'}
            />
            {warnMsg.username === 'required' && <span>{MSG.required}</span>}
            {warnMsg.username === 'usernameDupli' && <span>{MSG.usernameDupli}</span>}
            <input
                type='submit'
                value='회원가입'
                onClick={handleSubmit}
                disabled={disabled}
            />
        </div>
    )
}