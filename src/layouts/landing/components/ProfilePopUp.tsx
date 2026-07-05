import { LogOut, UserCircle } from "lucide-react"
import useProfilePopup from "../hooks/useProfilePopup/hook"
import { Link } from "react-router"

function ProfilePopUp(){
    const { currentUser,handleStatusChange, signOut, handleSignOut} = useProfilePopup()
    const { activityStatus,email, username } = currentUser
    return (
        <div className="p-2 rounded-2xl border border-[#645D68] bg-[#17161D] w-80 z-10 fixed bottom-20 left-20 text-white">
            <div className="flex flex-row gap-2 items-center px-4 py-2">
                <UserCircle size={40}/> {/* TODO: change to actual user profile */}
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold">{username === "" ? 'default user' : username }</h1>
                    <p className="font-extralight text-xs">{email === "" ? 'default@user.com' : email}</p>
                </div>
            </div>
            <div>
                <ProfilePopUpButton name={'available'} onClick={handleStatusChange}>
                    <span className="flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-green-500" />
                        Available 
                    </span>
                    {activityStatus === 'available' && <StatusCapsule/>}
                </ProfilePopUpButton>

                <ProfilePopUpButton name={'away'} onClick={handleStatusChange}>
                    <span className="flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-yellow-500" />
                        Away 
                    </span>
                    {activityStatus === 'away' && <StatusCapsule/>}
                </ProfilePopUpButton>

                <ProfilePopUpButton name={'do not disturb'} onClick={handleStatusChange}>
                    <span className="flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        Do not Disturb 
                    </span>
                    {activityStatus === 'do not disturb' && <StatusCapsule/>}
                </ProfilePopUpButton>

                <ProfilePopUpButton name={'offline'} onClick={handleStatusChange}>
                    <span className="flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-gray-500" />
                        Offline 
                    </span>
                    {activityStatus === 'offline' && <StatusCapsule/>}
                </ProfilePopUpButton>

                {signOut && (
                    <div className="fixed z-20 w-screen h-screen bg-black/50 bottom-0 top-0 left-0 right-0 justify-center items-center flex">
                        <div className="flex flex-col gap-4 border border-[#645D68] bg-[#17161D] p-4 rounded-xl w-100 h-60 items-center justify-center">
                            <h1>Are you sure you want to sign out?</h1>
                            <div className="flex flex-row gap-2">
                                <Link to={"/login"} className="flex rounded-2xl bg-[#6C1CD7] px-4 py-2 w-25 items-center justify-center">
                                    Yes
                                </Link>

                                <button onClick={handleSignOut} className="flex rounded-2xl border border-[#6C1CD7] px-4 py-2 w-25 cursor-pointer items-center justify-center">
                                    No
                                </button>
                            </div>

                        </div>
                    </div>
                )}
                <button 
                    onClick={handleSignOut}
                    className="text-[#FF0202] text-xs flex flex-row justify-between hover:bg-[#FF0202]/25 rounded-md w-full cursor-pointer px-4 py-2 gap-2 items-center h-12">
                    <h1> Sign Out </h1> <LogOut/>
                </button>


            </div>
        </div>
    )
}

function StatusCapsule(){
    return (
        <div className="px-3 py-1 rounded-xl text-xs bg-[#6C1CD7]"> Current </div>
    )
}

function ProfilePopUpButton({...props}){
    return (
        <button {...props} className="flex flex-row justify-between text-xs hover:bg-[#6C1CD7]/50 rounded-md w-full cursor-pointer px-4 py-2 gap-2 items-center h-10">{props.children}</button>
    )
}

export default ProfilePopUp