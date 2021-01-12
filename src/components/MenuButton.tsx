import React, { useState } from 'react';
import { IonButtons, IonButton, IonIcon, IonPopover, IonList, IonItem } from '@ionic/react';
import { ellipsisHorizontalOutline } from 'ionicons/icons';
import { useAuthConnect } from '@ionic-enterprise/auth-react';

interface MenuButtonProps {}

const MenuButton: React.FC<MenuButtonProps> = () => {
  const { logout } = useAuthConnect();
  const [popoverState, setPopoverState] = useState<{
    showPopover: boolean;
    event?: MouseEvent;
  }>({ showPopover: false });

  const handleOpenMenu = (e: React.MouseEvent) => {
    setPopoverState({
      showPopover: true,
      event: e.nativeEvent,
    });
  };

  const handleLogout = () => {
    setPopoverState({ showPopover: false, event: undefined });
    logout();
  };

  return (
    <>
      <IonButtons slot="end">
        <IonButton onClick={handleOpenMenu}>
          <IonIcon icon={ellipsisHorizontalOutline} />
        </IonButton>
      </IonButtons>
      <IonPopover
        cssClass="menu-popover"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => {
          if (popoverState.showPopover) {
            setPopoverState({ showPopover: false, event: undefined });
          }
        }}>
        <IonList>
          <IonItem lines="none" onClick={handleLogout}>Logout</IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default MenuButton;
