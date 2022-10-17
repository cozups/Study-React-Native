import { Alert, Button, View } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

const ImagePicker = () => {
  const [cameraPermissonInformation, requesetPermisson] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissonInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requesetPermisson();

      return permissionResponse.granted;
    }

    if (cameraPermissonInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You neet to grant camera permissions to use this app.'
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
  };

  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;
