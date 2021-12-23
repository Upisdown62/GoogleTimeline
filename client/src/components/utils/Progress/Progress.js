import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

function Progress(props) {
    const classes = useStyles()
    useEffect(() => {
        //console.log('>>>>>>>> show', props.show)
    }, [props.show])

    if(!props.show){
        return <></>
    } else {
        return (
            <div style={{
                position: 'fixed',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgb(0 0 0 / 10%)',
                zIndex: 19000
            }}>
                <div className={classes.root}>
                    <CircularProgress />
                </div>
            </div>
        )
    }
}

export default Progress