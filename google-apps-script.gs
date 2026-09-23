const DRIVE_FOLDER_ID = '148au5Px4-Ut5mVJv_VTdIXvkoBz4YNhq';
const SHEET_ID = '1hRSxTIP0pZUA4UXEKwsl9u3Jw-RwxMn4dGndNj97mUc';
const SHEET_NAME = 'Visa Report';

function doGet(){
  return ContentService.createTextOutput(JSON.stringify({ok:true,service:'Aero Tech Global Visa Portal'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  try{
    const data = JSON.parse(e.postData.contents || '{}');
    if(data.action === 'uploadVisa') return uploadVisa_(data);
    if(data.action === 'exportReport') return exportReport_(data);
    return json_({ok:false,error:'Unknown action'});
  }catch(err){
    return json_({ok:false,error:String(err)});
  }
}

function uploadVisa_(data){
  if(!data.base64 || !data.fileName) return json_({ok:false,error:'Missing file data'});
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const bytes = Utilities.base64Decode(data.base64);
  const blob = Utilities.newBlob(bytes, data.mimeType || 'application/pdf', data.fileName);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  const url = 'https://drive.google.com/uc?export=download&id=' + file.getId();
  return json_({ok:true,url:url,fileId:file.getId(),name:file.getName(),caseId:data.caseId||''});
}

function exportReport_(data){
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if(!sh) sh = ss.insertSheet(SHEET_NAME);
  sh.clearContents();
  const rows = data.rows || [];
  if(rows.length){
    sh.getRange(1,1,rows.length,rows[0].length).setValues(rows);
    sh.getRange(1,1,1,rows[0].length).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.autoResizeColumns(1,rows[0].length);
  }
  return json_({ok:true,sheetUrl:'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/edit'});
}

function json_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
