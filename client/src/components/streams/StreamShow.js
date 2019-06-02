import React from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';
import flv from 'flv.js';

// OBS: server is rtmp://localhost/live, streamkey is ID

class StreamShow extends React.Component {
    // Constructor used to get a reference to the video element
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        // Follow-up render build player
        this.buildPlayer();
    }

    componentWillUnmount() {
        // Code to stop player when stream is stopped
        this.player.destroy();
    }

    buildPlayer() {
        // For edge case if page is loaded but access to stream has not been given/created
        if (this.player || !this.props.stream) {
            return;
        }
        // Code for player, only setup player after appropriate stream has been fetched
        const {id} = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }

        const {title, description} = this.props.stream;
        
        return (
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls={true}/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchStream})(StreamShow);