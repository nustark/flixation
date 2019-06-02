import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
    // Only want to initialize library once when the class is rendered to the screen
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: // google api key,
                scope: 'email'
            }).then(() => { //client.init returns a promise, invoke arrow function after library has been initiated
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        // Called whenever user authentication status changes
        if (isSignedIn) {
            // When calling action creator, the ID of the person signed in will be passed too
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className='ui red google button'>
                    <i className='google icon'/>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className='ui red google button'>
                    <i className='google icon'/>
                    Sign In With Google
                </button>
            );
        }
    };

    render() {
        return <div>{this.renderAuthButton()}</div>
    };
};

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);