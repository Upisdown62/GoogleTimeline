import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import JsonUpload from '../../../utils/JsonUpload'
import ApiService from '../../../../module/ApiService'
import { isMobile } from 'react-device-detect'
import { useSnackbar } from 'notistack'
import { TransitionProps } from '@material-ui/core/transitions';
import { User, MResFileJson } from 'model/index'

interface IProps {
  onClick: () => void,
  user: User
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TlUploadPage:React.FC<IProps> = ({ user, onClick }): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false)
  const [Files, setFiles] = useState<File[]>([])
  const [FilePath, setFilePath] = useState<string[]>([])
  const [Vaild, setVaild] = useState<boolean>(false)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleSnackbar = () => {
    const message = '해당 기능은 PC 환경을 이용해주세요!'
    const snackbarKey = enqueueSnackbar(message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      autoHideDuration: 2000,
      onClick: () => closeSnackbar(snackbarKey)
    })
  }

  const handleClickOpen = () => {
    if(isMobile){
      handleSnackbar()
    } else {
      setOpen(true)
    }
  }

  const handleClear = () => {
    setFiles([])
    setVaild(false)
  }

  const handleClose = () => {
    setOpen(false)
    setVaild(false)
  }

  const handleVaildation = async() => {
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
    for (let file of Files){
      formData.append('file', file)
    }    

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const res : MResFileJson = await ApiService.dataVaildation(formData, config)
    if(res.success){
      let newPath: string[] = []
      res.files.map((cur) => {
        newPath.push(cur.path)
      })
      setFilePath(newPath)
      //console.log('>>>>>>> newPath' ,newPath)
      setVaild(true)
    } else {
      alert('파일 검증 오류!')
    }
  }
  

  const handleUpload = async() => {
    const body = {
      filePath: FilePath,
      userId: user._id
    }
    const res = await ApiService.dataSave(body)
    if(res.data.success){
      alert(`${res.data.successCnt}건이 업로드 되었습니다!`)
      setFiles([])
      setFilePath([])
      setOpen(false)
      setVaild(false)
    }
    else {
      alert('파일 업로드 실패!')
    }
  }

  const onSetFiles = (files:File[]) => {
    setFiles(files)
  }

  return (
    <div>
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