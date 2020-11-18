import React from 'react';

class ControlPanel extends React.Component {
    render() {
        return (
            <div id={`${this.props.value.toLowerCase()}-panel`} className='control-panel'>
                <button
                    aria-label={`set ${this.props.value.toLowerCase()} to default duration.`}
                    id={`default-${this.props.value.toLowerCase()}`}
                    onClick={this.props.handleDefaultBtn}
                >
                    {(this.props.lang === 'en') ? this.props.value : this.props.LANG_MAP[this.props.value]}
                </button>

                <div>
                    <button
                        aria-label={`decrement ${this.props.value.toLowerCase()} duration by 1 minute.`}
                        id={`${this.props.value.toLowerCase()}-decrement`}
                        onClick={this.props.handleInDecrement}
                        className='btn-level'
                    >
                        <i className="fa fa-arrow-down fa-2x" aria-hidden="true"></i>
                    </button>

                    <p aria-label={`Custom ${this.props.value}`} aria-live='assertive' id={`${this.props.value.toLowerCase()}-length`} className='btn-level'>{this.props.length}</p>

                    <button
                        aria-label={`increment ${this.props.value.toLowerCase()} duration by 1 minute.`}
                        id={`${this.props.value.toLowerCase()}-increment`}
                        onClick={this.props.handleInDecrement}
                        className='btn-level'
                    >
                        <i className="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

        )
    }
}

export default ControlPanel;