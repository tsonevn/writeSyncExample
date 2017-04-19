/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import {knownFolders} from "file-system";
import {Image} from "ui/image";
import {Button} from "ui/button"

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;
    
    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = new HelloWorldModel();
}

export function onTap(args){
    var button:Button = <Button>args.object;
    var page:Page = <Page>button.page;

    var fileName = "logo.png";
    var documents = knownFolders.currentApp();
    var image = documents.getFile('image/icon.png');
    console.log("image")
    console.dump(image);
    
    var source = image.readSync(e=> { console.log( "Error: "+e); });
    console.log("source");
    console.log(source);
    var destinationFile = knownFolders.documents().getFile(fileName);

    destinationFile.writeSync(source, e=> { console.log( "Error: "+e); });

    var resultFilePath = knownFolders.documents().getFile(fileName).path;
    console.log("resultFilrPath");
    console.log(resultFilePath);
    var imageView:Image = <Image>page.getViewById("imageid");
    imageView.src=resultFilePath;
    
}