# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



#### Removed code form Header

    {/* <a href="#flights" title="Flights" className="flex flex-col items-center text-blue-500 pr-3">
                                            <MdFlightTakeoff size={25} />
                                            <span className="mt-1 text-sm">Flights</span>
                                        </a>
                                        <a href="#hotels" title='Hotels' className=" flex flex-col items-center pr-3">
                                            <LiaHotelSolid size={25} />

                                            <span className="mt-1 text-sm">Hotels</span>
                                        </a>
                                        <a href="#homestays" title='Homestays & Villas' className=" flex flex-col items-center pr-3">
                                            <MdMapsHomeWork size={25} />
                                            <div className="text-ellipsis line-clamp-1" style={{ width: '80px' }}>
                                                <span className="mt-1 text-sm">Homestays & Villas</span>
                                            </div>
                                        </a>
                                        <a href="#holiday-packages" title='Holiday Packages' className="  flex flex-col items-center pr-3">
                                            <TbBeach size={25} />
                                            <div className="text-ellipsis line-clamp-1" style={{ width: '80px' }}>
                                                <span className="mt-1 text-sm">  Holiday Packages</span>
                                            </div>
                                        </a>
                                        <a href="#trains" title='Trains' className=" flex flex-col items-center pr-3">
                                            <LiaTrainSolid size={25} />

                                            <span className="mt-1 text-sm">Trains</span>

                                        </a>

                                        <a href="#buses" title='Buses' className=" flex flex-col items-center pr-3">
                                            <LiaBusSolid size={25} />

                                            <span className="mt-1 text-sm">Buses</span>

                                        </a>
                                        <a href="#cabs" title='Cabs' className=" flex flex-col items-center pr-3">
                                            <LiaCarSolid size={25} />

                                            <span className="mt-1 text-sm">Cabs</span>

                                        </a>
                                        <a href="#forex" title='Forex Card & Currency' className=" flex flex-col items-center ">
                                            <RiCurrencyLine size={25} />

                                            <div className="text-ellipsis line-clamp-1" style={{ width: '80px' }}>
                                                Forex Card & Currency
                                            </div>
                                        </a>

                                        <a href="#travel-insurance" title='Travel Insurance' className=" flex flex-col items-center pr-20">
                                            <CiMedicalClipboard size={25} />

                                            <div className="text-ellipsis line-clamp-1" style={{ width: '80px' }}>
                                                Travel Insurance
                                            </div>
                                        </a> */}


                                        <!-- mobile header -->

                                         {/* <a href="#flights" title="Flights" className=" flex gap-3 block rounded-md px-3 py-2 text-base font-medium">
                                <MdFlightTakeoff size={25} />
                                <span className="mt-1 text-sm">Flights</span>
                            </a>
                            <a href="#hotels" title="Flights" className=" flex gap-3 block rounded-md px-3 py-2 text-base font-medium">
                                <LiaHotelSolid size={25} />

                                <span className="mt-1 text-sm">Hotels</span>
                            </a>
                            <a href="#homestays" title='Homestays & Villas' className=" flex gap-3 block rounded-md px-3 py-2 text-base font-medium">
                                <MdMapsHomeWork size={25} />
                                <div className="">
                                    <span className="mt-1 text-sm">Homestays & Villas</span>
                                </div>
                            </a>
                            <a href="#holiday-packages" title='Holiday Packages' className="  flex gap-3 block rounded-md px-3 py-2 text-base font-medium">
                                <TbBeach size={25} />
                                <div >
                                    <span className="mt-1 text-sm">  Holiday Packages</span>
                                </div>
                            </a>
                            <a href="#trains" title='Trains' className="flex gap-3 block rounded-md px-3 py-2 text-base font-medium">
                                <LiaTrainSolid size={25} />

                                <span className="mt-1 text-sm">Trains</span>

                            </a>

                            <a href="#buses" title='Buses' className="flex gap-3 block rounded-md px-3 py-2 text-base font-medium">
                                <LiaBusSolid size={25} />

                                <span className="mt-1 text-sm">Buses</span>

                            </a>
                            <a href="#cabs" title='Cabs' className=" flex gap-3 block rounded-md px-3 py-2 text-base font-medium">
                                <LiaCarSolid size={25} />

                                <span className="mt-1 text-sm">Cabs</span>

                            </a>
                            <a href="#forex" title='Forex Card & Currency' className="flex gap-3 block rounded-md px-3 py-2 text-base font-medium ">
                                <RiCurrencyLine size={25} />

                                <div >
                                    Forex Card & Currency
                                </div>
                            </a>

                            <a href="#travel-insurance" title='Travel Insurance' className="flex gap-3 block rounded-md px-3 py-2 text-base font-medium">
                                <CiMedicalClipboard size={25} />

                                <div >
                                    Travel Insurance
                                </div>
                            </a> */}



                           