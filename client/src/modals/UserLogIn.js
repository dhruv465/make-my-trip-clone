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
import MobileSignupForm from '../Mycomponents/Home/MobileSignupForm';


export default function UserLogIn({ open, setOpen }) {
  const [isEmailSignup, setIsEmailSignup] = useState(true);
  const toggleSignupMethod = () => { setIsEmailSignup(!isEmailSignup); };

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
            <Tab disableIndicator>PERSONAL ACCOUNT</Tab>
            <Tab disableIndicator>MYBIZ ACCOUNT</Tab>

          </TabList>
          <TabPanel value={0}>
            <div>
              {isEmailSignup ? (
                <EmailSignupForm onSwitchToMobile={toggleSignupMethod} />
              ) : (
                <MobileSignupForm onSwitchToEmail={toggleSignupMethod} />
              )}
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div className="max-w-md mx-auto mt-6">
              <h2 className="text-2xl font-bold mb-6">Login/Sign up</h2>

              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your work email id"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or use your business account with
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <img className="h-5 w-5 mr-2" src="https://www.google.com/favicon.ico" alt="Google logo" />
                    Google
                  </button>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500 text-center">
                By proceeding, you agree to MakeMyTrip's Terms and Privacy
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </Sheet>
    </Modal>
  );
}
