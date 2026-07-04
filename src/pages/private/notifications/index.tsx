import NotificationContainer from "./components/NotificationContainer"
import NotificationMessageCard from "./components/NotificationMessageCard"
import NotificationRequestCard from "./components/NotificationRequestCard"

function NotificationsPage(){

    return (
        <div className="p-8 flex flex-col gap-4 w-full h-full">
            <h1 className="text-5xl font-bold text-white h-40">Notifications</h1>

            <NotificationContainer title="Urgent">
                <NotificationMessageCard>

                </NotificationMessageCard>
            </NotificationContainer>
            <NotificationContainer title="Join Request">
                <NotificationRequestCard>

                </NotificationRequestCard>
            </NotificationContainer>
            <NotificationContainer title="Member Request">
                <NotificationRequestCard>
                    
                </NotificationRequestCard>
            </NotificationContainer>

            
        </div>
    )
}


export default NotificationsPage