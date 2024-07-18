import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import EmailSignupForm from '../Mycomponents/Home/EmailSignupForm';
import RegisterUser from '../Mycomponents/Home/RegisterUser';


export default function UserLogIn({ open, setOpen }) {
  const [isEmailSignup, setIsEmailSignup] = useState(true);
  const toggleSignupMethod = () => { setIsEmailSignup(!isEmailSignup); };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={4}
        >

        </Typography>
        <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
          <TabList
            disableUnderline
            sx={{
              p: 0.5,
              gap: 0.5,
              borderRadius: 'xl',
              bgcolor: 'background.level1',
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: 'sm',
                background: 'linear-gradient(93deg, #53b2fe, #065af3)',
                fontWeight: 'bold',
                color: 'white',

              },
            }}
          >
            <Tab disableIndicator>LOGIN ACCOUNT</Tab>
            <Tab disableIndicator>SIGN UP ACCOUNT</Tab>

          </TabList>
          <TabPanel value={0}>
            <EmailSignupForm onSwitchToMobile={toggleSignupMethod} onClose={handleClose} />
          </TabPanel>
          <TabPanel value={1}>
            <RegisterUser onSwitchToEmail={toggleSignupMethod} />
          </TabPanel>
        </Tabs>
      </Sheet>
    </Modal>
  );
}
