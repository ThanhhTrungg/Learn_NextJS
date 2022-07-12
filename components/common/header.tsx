import * as React from 'react';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    console.log("Render header");

    return <div className='header'>Header</div>;
};

export default Header;