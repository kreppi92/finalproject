import React from 'react';
import PropTypes from 'prop-types';

const TIME_CONSTANT = 325
const WHEEL_SPEED = 5

const BASE_STYLE = {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
}

const VIEW_STYLE = {
    // position: 'absolute',
    top: 0,
    left: 0,
}

class Scrolling extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pressed: false,
            reference: null,
            offset: 0,
            min: 0,
            max: 0,
            dragging: false,
        }
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)

        this.handleDrag = this.handleDrag.bind(this)
        this.handleRelease = this.props.snap ?
                             this.handleReleaseWithSnap.bind(this) :
                             this.handleRelease.bind(this)
        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount() {
        this.update()
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    setMaxTransform() {
        const max = this.props.horizontal ?
            this.refs.view.offsetWidth - this.refs.base.offsetWidth :
            this.refs.view.offsetHeight - this.refs.base.offsetHeight

        this.setState({ max })
    }

    update() {
        this.setMaxTransform()
        this.trackPosition()

        const boundAutoscroll = this.autoScroll.bind(this)
        requestAnimationFrame(boundAutoscroll)
    }

    pos(e) {
        // touch event
        const clientPos = this.props.horizontal ? 'clientX' : 'clientY'
        if (e.targetTouches && (e.targetTouches.length >= 1)) {
            return e.targetTouches[0][clientPos]
        }

        // mouse event
        return e[clientPos]
    }

    scroll(x) {
        const { min, max } = this.state
        let offset = (x > max) ? max : null
        if (!offset) {
            offset = (x < min) ? min : x
        }

        this.refs.view ? 
        
        this.refs.view.style.transform = this.props.horizontal ?
        `translateX(${-offset}px)` :
        `translateY(${-offset}px)`

        : false


        this.setState({ offset })
        this.trackPosition()
    }

    track() {
        const now = Date.now()
        const elapsed = now - this.state.timestamp
        this.setState({
            timestamp: now,
        })
        const delta = this.state.offset - this.state.frame
        const v = 1000 * delta / (1 + elapsed)

        this.setState({
            frame: this.state.offset,
            velocity: 0.8 * v + 0.2 * this.state.velocity,
        })
    }

    autoScroll() {
        let elapsed
        let delta

        if (this.state.amplitude) {
            elapsed = Date.now() - this.state.timestamp
            delta = -this.state.amplitude * Math.exp(-elapsed / TIME_CONSTANT)
            if (delta > 5 || delta < -5) {
                this.scroll(this.state.target + delta)
                const boundAutoscroll = this.autoScroll.bind(this)
                requestAnimationFrame(boundAutoscroll)
            } else {
                this.scroll(this.state.target)
            }
        }
    }

    // Public methods

    scrollToItem(idx) {
        if (this.props.snap) {
            const target = idx * this.props.snap
            const amplitude = target - this.state.offset

            // TODO: Find solution for better enabling animation in this method
            this.viewStyle = {
                ...this.viewStyle,
                transition: 'transform .3s',
            }

            this.setState({
                target,
                amplitude,
                timestamp: Date.now(),
            })

            this.scroll(target)
        }
    }

    prev() {
        if (this.props.snap) {
            this.scrollToItem(this.current() - 1)
        }
    }

    next() {
        if (this.props.snap) {
            this.scrollToItem(this.current() + 1)
        }
    }

    current() {
        let current
        if (this.state.offset === 0) {
            current = 0
        } else {
            current = Math.round(this.state.offset / this.props.snap)
        }
        return current
    }

    atBegin() {
        return this.state.offset === 0
    }

    atEnd() {
        return this.state.offset === this.state.max
    }


    // Events handlers

    handleTap(e) {
        this.setState({
            pressed: true,
            reference: this.pos(e),
            velocity: 0,
            amplitude: 0,
            timestamp: Date.now(),
            frame: this.state.offset,
        })

        clearInterval(this.ticker)
        const boundTrack = this.track.bind(this)
        this.ticker = setInterval(boundTrack, 100)

        this.trackPosition()

        window.addEventListener('mousemove', this.handleDrag)
        window.addEventListener('mouseup', this.handleRelease)

        e.preventDefault()
        e.stopPropagation()
        return false
    }

    handleDrag(e) {
        let x
        let delta

        if (this.state.pressed) {
            x = this.pos(e)
            delta = this.state.reference - x

            if (delta > 2 || delta < -2) {
                this.setState({
                    reference: x,
                    dragging: true,
                })

                this.scroll(this.state.offset + delta)
                this.viewStyle = {
                    ...this.viewStyle,
                    transition: 'none',
                }
            }
        }

        e.preventDefault()
        e.stopPropagation()
        return false
    }

    handleRelease(e) {
        this.setState({
            pressed: false,
        })

        clearInterval(this.ticker)
        if (this.state.velocity > 10 || this.state.velocity < -10) {
            const amplitude = 0.8 * this.state.velocity
            const target = Math.round(this.state.offset + amplitude)

            this.setState({
                target,
                amplitude,
                timestamp: Date.now(),
            })

            const boundAutoscroll = this.autoScroll.bind(this)
            requestAnimationFrame(boundAutoscroll)
        }

        window.removeEventListener('mousemove', this.handleDrag)
        window.removeEventListener('mouseup', this.handleRelease)

        e.preventDefault()
        e.stopPropagation()
        return false
    }

    handleReleaseWithSnap(e) {
        this.setState({
            pressed: false,
        })

        clearInterval(this.ticker)
        let amplitude
        let target = this.state.offset

        if (this.state.velocity > 10 || this.state.velocity < -10) {
            amplitude = 0.8 * this.state.velocity
            target = Math.round(this.state.offset + amplitude)
        }

        target = Math.round(target / this.props.snap) * this.props.snap
        amplitude = target - this.state.offset

        this.setState({
            target,
            amplitude,
            timestamp: Date.now(),
        })

        const boundAutoscroll = this.autoScroll.bind(this)
        requestAnimationFrame(boundAutoscroll)

        window.removeEventListener('mousemove', this.handleDrag)
        window.removeEventListener('mouseup', this.handleRelease)

        if (e.currentTarget.getAttribute('id') !== this.refs.view.id) {
            this.setState({
                dragging: false,
            })
        }
    }

    handleWheel(e) {
        this.viewStyle = {
            ...this.viewStyle,
            transition: 'none',
        }
        let target = this.state.offset + e.deltaY * WHEEL_SPEED

        if (this.props.snap) {
            target = Math.round(target / this.props.snap) * this.props.snap
        }
        const amplitude = target - this.state.offset

        this.setState({
            target,
            amplitude,
            timestamp: Date.now(),
        })

        const boundAutoscroll = this.autoScroll.bind(this)
        requestAnimationFrame(boundAutoscroll)

        e.preventDefault()
        e.stopPropagation()
        return false
    }

    handleClick() {
        this.setState({
            dragging: false,
        })
    }

    handleResize() {
        this.update()
        this.forceUpdate()
    }

    // Callback returning Kinetic-scroller state

    trackPosition() {
        if (this.props.trackPosition) {
            this.props.trackPosition({
                atBegin: this.atBegin(),
                atEnd: this.atEnd(),
                dragging: this.state.dragging,
            })
        }
    }

    render() {
        const tapHandler = this.handleTap.bind(this)
        const wheelHandler = this.handleWheel.bind(this)

        const clickHandler = this.handleClick.bind(this)

        let viewStyle = { ...VIEW_STYLE, ...this.viewStyle }
        if (this.props.horizontal) {
            viewStyle = {
                ...viewStyle,
                whiteSpace: 'nowrap',
            }
        }

        return (
            <div style={BASE_STYLE} className={this.props.className} ref="base">
                <div
                  style={viewStyle}
                  ref="view"
                  id="js-view"
                  onMouseDown={tapHandler}
                  onMouseUp={this.handleRelease}
                  onClick={clickHandler}
                  onWheel={wheelHandler}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}


Scrolling.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]).isRequired,
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    snap: PropTypes.number,
    trackPosition: PropTypes.func,
}


export default Scrolling