import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import JsonUpload from '../../../utils/JsonUpload'
import axios from 'axios'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function TlUploadPage(props) {
  const [open, setOpen] = useState(false)
  const [Files, setFiles] = useState([])
  const [FilePath, setFilePath] = useState([])
  const [Vaild, setVaild] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClear = () => {
    setFiles([])
    setVaild(false)
  }

  const handleClose = () => {
    setOpen(false)
    setVaild(false)
  }

  const handleVaildation = () => {
    if(Files.length === 0) return

    for(let i = 0; i < Files.length; i++){
      for(let j = 0; j < Files.length; j++){
        if(Files[i].name === Files[j].name && i !== j){
          alert(`${Files[i].name} 파일이 중복됩니다!`)
          return
        }
      }
    }

    let formData = new FormData()
    for(let i = 0; i < Files.length; i++){
        formData.append("file", Files[i])
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post('/api/polyline/vaildation', formData, config)
    .then(response => {
      if(response.data.success){
        let newPath = []
        response.data.files.map((cur) => {
          newPath.push(cur.path)
        })
        setFilePath(newPath)
        setVaild(true)
    } else{
        alert('파일 검증 오류!')
      }
    })
  }
  

  const handleUpload = () => {
    const body = {
      filePath: FilePath,
      userId: props.user._id
    }
    axios.post('/api/polyline/save', body)
    .then(response => {
      if(response.data.success){
        alert(`${response.data.successCnt}건이 업로드 되었습니다!`)
        setFiles([])
        setFilePath([])
        setOpen(false)
        setVaild(false)
      }
      else {
        alert('파일 업로드 실패!')
      }
    })
  }

  const onSetFiles = (files) => {
    setFiles(files)
  }

  return (
    <div style={{padding: '10px 15px'}}>
      <div onClick={handleClickOpen}>
        Data Upload
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Json 파일을 업로드하세요!
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
          Text~~
          </DialogContentText> */}
            <JsonUpload
              initFiles={Files}
              updateFiles={onSetFiles}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear} color="primary">
            초기화
          </Button>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleVaildation} color="primary"
            disabled={Files.length > 0 ? false:true}>
            검증
          </Button>
          <Button onClick={handleUpload} color="primary" disabled={!Vaild}>
            업로드
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TlUploadPage