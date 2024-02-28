import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';


export default function Home() {

    return (
        <div>
            <Header page={'home'}/>
        </div>
    )

}