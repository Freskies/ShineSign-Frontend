import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DOC_WIDTH = 210;
const DOC_HEIGHT = 297;

export async function generatePDF (pagesRef) {
	const pageList = Object.values(pagesRef.current);
	const canvasList = await getCanvasList(pageList);
	const pdf = new jsPDF("p", "mm", "a4");
	for (let i = 0; i < canvasList.length; i++) {
		if (i !== 0) pdf.addPage();
		await pdf.addImage(canvasList[i], "PNG", 0, 0, DOC_WIDTH, DOC_HEIGHT);
	}
	pdf.save("document.pdf");
	return pdf.output("blob");
}


async function getCanvasList (pageList) {
	const canvasList = [];
	for (let i = 0; i < pageList.length; i++) {
		const canvas = await html2canvas(pageList[i]);
		canvasList.push(canvas);
	}
	return canvasList;
}