import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import * as DropdownMenuPrimitive from "../components/primitives/dropdown-menu";


const INDICATOR_STYLE: ViewStyle = {
  height: 5,
  width: 5,
  backgroundColor: "red",
  borderRadius: 50,
  position: "absolute",
  left: -10,
  top: 6,
};


export default function Index() {
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [subCheckboxValue, setSubCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('pedro');

  return (
    <View style={{flex: 1}}>


      <DropdownMenuPrimitive.Root style={{height: 48, width:'90%'}}>
        <DropdownMenuPrimitive.Trigger>
          <Text>Open Dropdown Menu</Text>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Overlay style={[StyleSheet.absoluteFill, ]}>
            <DropdownMenuPrimitive.Content style={{backgroundColor:'red', width:'100%'}}> 
              <DropdownMenuPrimitive.Item>
                <Text>Back</Text>
              </DropdownMenuPrimitive.Item>
              <DropdownMenuPrimitive.Item>
                <Text>Forward</Text>
              </DropdownMenuPrimitive.Item>
              <DropdownMenuPrimitive.Item>
                <Text>Reload</Text>
              </DropdownMenuPrimitive.Item>

              <DropdownMenuPrimitive.Sub>
                <DropdownMenuPrimitive.SubTrigger>
                  <Text>More Tools</Text>
                </DropdownMenuPrimitive.SubTrigger>
                <DropdownMenuPrimitive.SubContent>
                  <DropdownMenuPrimitive.Item>
                    <Text>Save Page As...</Text>
                  </DropdownMenuPrimitive.Item>
                  <DropdownMenuPrimitive.Item>
                    <Text>Create Shortcut...</Text>
                  </DropdownMenuPrimitive.Item>

                  <DropdownMenuPrimitive.Separator />
                  <DropdownMenuPrimitive.Item>
                    <Text>Developer Tools</Text>
                  </DropdownMenuPrimitive.Item>
                </DropdownMenuPrimitive.SubContent>
              </DropdownMenuPrimitive.Sub>

              <DropdownMenuPrimitive.Separator />
              <DropdownMenuPrimitive.CheckboxItem
                checked={checkboxValue}
                onCheckedChange={setCheckboxValue}
                closeOnPress={false}
              >
                <Text>Show Bookmarks Bar</Text>
                <DropdownMenuPrimitive.ItemIndicator style={INDICATOR_STYLE} />
              </DropdownMenuPrimitive.CheckboxItem>
              <DropdownMenuPrimitive.CheckboxItem
                checked={subCheckboxValue}
                onCheckedChange={setSubCheckboxValue}
                closeOnPress={false}
              >
                <Text>Show Full URLs</Text>
                <DropdownMenuPrimitive.ItemIndicator style={INDICATOR_STYLE} />
              </DropdownMenuPrimitive.CheckboxItem>
              <DropdownMenuPrimitive.Separator />
              <DropdownMenuPrimitive.RadioGroup
                value={radioValue}
                onValueChange={setRadioValue}
              >
                <DropdownMenuPrimitive.Label>
                  People
                </DropdownMenuPrimitive.Label>
                <DropdownMenuPrimitive.Separator />
                <DropdownMenuPrimitive.RadioItem
                  value="pedro"
                  closeOnPress={false}
                >
                  <Text>Elmer Fudd</Text>
                  <DropdownMenuPrimitive.ItemIndicator
                    style={INDICATOR_STYLE}
                  />
                </DropdownMenuPrimitive.RadioItem>
                <DropdownMenuPrimitive.RadioItem
                  value="colm"
                  closeOnPress={false}
                >
                  <Text>Foghorn Leghorn</Text>
                  <DropdownMenuPrimitive.ItemIndicator
                    style={INDICATOR_STYLE}
                  />
                </DropdownMenuPrimitive.RadioItem>
              </DropdownMenuPrimitive.RadioGroup>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Overlay>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
      <Text>Hellow World</Text>
          </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
