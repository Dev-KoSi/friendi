import { useEffect, useState } from "react";


export function MyDetails () {

    const [save, setSave] = useState('save');
    const [edit, setEdit] = useState('');

    const [myDetails, setMyDetails] = useState(JSON.parse(localStorage.getItem('user-details')));

    // console.log(myDetails);
    
    useEffect(() => {
        localStorage.removeItem('user-details');

        localStorage.setItem('user-details', JSON.stringify(myDetails));
    }, [myDetails]);

    const [name, setName] = useState(myDetails ? myDetails.name : '');
    const [email, setEmail] = useState(myDetails ? myDetails.email : '');
    const [phone, setPhone] = useState(myDetails ? myDetails.phone : '');
    const [github, setGithub] = useState(myDetails ? myDetails.github : '');
    const [linkedin, setLinkedin] = useState(myDetails ? myDetails.linkedin : '');
    const [otherlink, setOtherlink] = useState(myDetails ? myDetails.otherlink : '');

    const [userId, setUserId] = useState(() => localStorage.getItem('user-id'));
    // console.log(userId);


    const addDetailsFunc = async () => {
        const details = {
            name,
            email,
            phone,
            github,
            linkedin,
            otherlink
        };

        try {
            const res = await fetch(`https://friendi-be.onrender.com/friendi/${userId}/adddetails`, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(details)
            });

            const result = await res.json();

            setMyDetails((d) => d = result.details);

            console.log(myDetails);

            if(result.success === false) {
                alert(`${result.message}`)
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <div className="personal-details">
                <div className="my-d-txt">
                    My Details
                </div>
                <div style={{marginBottom : "20px"}}></div>
                <div className="user-name">
                    <div>NAME: </div> {edit === '' ? <div>{myDetails && myDetails.name}</div> : <div><input value={name} onChange={(e) => {
                        setName(e.target.value)
                    }}/></div>}

                    <div className='hover'>
                        <button className={edit} onClick={() => {
                            setEdit('edit');
                            setSave('');
                        }}>Edit</button>
                        
                        <button className={save} onClick={() => {
                            setEdit('');
                            setSave('save');
                            addDetailsFunc();
                        }}>Save</button>
                    </div>
                </div>

                <div className="user-email">
                    <div>EMAIL: </div> {edit === '' ? <div>{myDetails && myDetails.email}</div> : <div><input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}/></div>}

                    <div className='hover'>
                        <button className={edit} onClick={() => {
                            setEdit('edit');
                            setSave('');
                        }}>Edit</button>
                        
                        <button className={save} onClick={() => {
                            setEdit('');
                            setSave('save');
                            addDetailsFunc();
                        }}>Save</button>
                    </div>
                </div>

                <div className="user-phone">
                    <div>PHONE: </div> {edit === '' ? <div>{myDetails && myDetails.phone}</div> : <div><input value={phone} onChange={(e) => {
                        setPhone(e.target.value)
                    }}/></div>}

                    <div className='hover'>
                        <button className={edit} onClick={() => {
                            setEdit('edit');
                            setSave('');
                        }}>Edit</button>
                        
                        <button className={save} onClick={() => {
                            setEdit('');
                            setSave('save');
                            addDetailsFunc();
                        }}>Save</button>
                    </div>
                </div>

                <div className="user-github">
                    <div>GITHUB: </div> {edit === '' ? <div>{myDetails && myDetails.github}</div> : <div><input value={github} onChange={(e) => {
                        setGithub(e.target.value)
                    }}/></div>}

                    <div className='hover'>
                        <button className={edit} onClick={() => {
                            setEdit('edit');
                            setSave('');
                        }}>Edit</button>
                        
                        <button className={save} onClick={() => {
                            setEdit('');
                            setSave('save');
                            addDetailsFunc();
                        }}>Save</button>
                    </div>
                </div>

                <div className="user-linkedin">
                    <div>LINKEDIN: </div> {edit === '' ? <div>{myDetails && myDetails.linkedin}</div> : <div><input value={linkedin} onChange={(e) => {
                        setLinkedin(e.target.value)
                    }}/></div>}

                    <div className='hover'>
                        <button className={edit} onClick={() => {
                            setEdit('edit');
                            setSave('');
                        }}>Edit</button>
                        
                        <button className={save} onClick={() => {
                            setEdit('');
                            setSave('save');
                            addDetailsFunc();
                        }}>Save</button>
                    </div>
                </div>

                <div className="user-linkedin">
                    <div>OTHER LINK: </div> {edit === '' ? <div>{myDetails && myDetails.otherlink}</div> : <div><input value={otherlink} onChange={(e) => {
                        setOtherlink(e.target.value)
                    }}/></div>}

                    <div className='hover'>
                        <button className={edit} onClick={() => {
                            setEdit('edit');
                            setSave('');
                        }}>Edit</button>
                        
                        <button className={save} onClick={() => {
                            setEdit('');
                            setSave('save');
                            addDetailsFunc();
                        }}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}