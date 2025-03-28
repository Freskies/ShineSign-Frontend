import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DOC_WIDTH = 210;
const DOC_HEIGHT = 297;

export async function generatePDF (pagesRef) {
	const pageList = Object.values(pagesRef.current);
	const canvasList = await getCanvasList(pageList);
	const pdf = new jsPDF();
	for (let i = 0; i < canvasList.length; i++) {
		if (i !== 0) pdf.addPage();
		pdf.addImage(canvasList[i], "JPEG", 0, 0);
	}
	pdf.save("download.pdf");
}


async function getCanvasList (pageList) {
	const canvasList = [];
	for (let i = 0; i < pageList.length; i++) {
		const canvas = await html2canvas(pageList[i]);
		const imageCanvas = canvas.toDataURL("image/jpeg");
		canvasList.push(imageCanvas);
	}
	return canvasList;
}