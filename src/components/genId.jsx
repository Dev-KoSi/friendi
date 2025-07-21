import { useEffect, useState } from "react";

function generateMixedId() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    const randomLetters = Array.from({ length: 3 }, () =>
        letters.charAt(Math.floor(Math.random() * letters.length))
    );

    const randomNumbers = Array.from({ length: 3 }, () =>
        numbers.charAt(Math.floor(Math.random() * numbers.length))
    );

    const combined = [...randomLetters, ...randomNumbers];

    // Fisher-Yates shuffle
    for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    return combined.join('');
}

export function IdGenerator({id, setId, changeIdFunc}) {
    const handleGenerate = () => {
        const newId = generateMixedId();

        setId(newId);
    };
    
    return (
        <div className='gen-id'>
            {(<div className="txt">
                    My ID: <span>{id}</span>
                </div>)}
            
            {(<div className="gen-btn">
                <div className="id-btn hover">
                    <button onClick={handleGenerate}>Change</button>
                </div>

                <div className=" id-btn hover">
                    <button  onClick={() => {
                        changeIdFunc();
                }}>Save</button>
                </div>
            </div>)}
        </div>
    );
}
